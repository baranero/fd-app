import React, { FormEvent, useState } from "react";
import Layout from "@/components/Layout";
import SelectInput from "@/components/SelectInput";
import Input from "@/components/Input";
import DetailsList from "@/components/DetailsList";
import useUserList from "@/hooks/useUserList";
import useWarehouse from "@/hooks/useWarehouse";
import useProducts from "@/hooks/useProducts";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";

interface WarehouseItem {
  id: string;
  userId: string;
  user: { name: string };
  productId: string;
  manufacturer: string;
  model: string;
  name: string;
  quantity: number;
  productValue: number;
  notes?: string;
  entryDate: string;
  operation: string;
}

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  price: number;
  quantity: number;
  totalValue: number;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Warehouse: React.FC = () => {
  const { data: Firefighters = [] } = useUserList();
  const { data: WarehouseItems = [], mutate: mutateWarehouse } = useWarehouse();
  const { data: Products = [], mutate: mutateProducts } = useProducts();
  const { data: currentUser } = useCurrentUser();

  const [formData, setFormData] = useState({
    productId: "",
    quantity: 0,
    notes: "",
    operation: "Dodaję",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/warehouse/${id}`);
      mutateWarehouse();
      mutateProducts();
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: "Item deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Failed to delete item. Please try again.",
      });
    }
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const columns: GridColDef[] = [
    { field: "userName", headerName: "Kto dodał?", flex: 1 },
    { field: "name", headerName: "Nazwa", flex: 1 },
    { field: "manufacturer", headerName: "Producent", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "quantity", headerName: "Ilość", type: "number", flex: 0.5 },
    { 
      field: "productValue", 
      headerName: "Cena jedn.", 
      type: "number", 
      flex: 0.5,
      valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value} zł`,
    },
    { 
      field: "totalValue", 
      headerName: "Wartość", 
      type: "number", 
      flex: 0.5,
      valueGetter: (params: GridValueGetterParams<WarehouseItem>) => params.row.quantity * params.row.productValue,
      valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value} zł`,
    },
    { field: "notes", headerName: "Uwagi", flex: 1 },
    { 
      field: "entryDate", 
      headerName: "Wprowadzono", 
      type: "dateTime", 
      flex: 1,
      valueGetter: (params: GridValueGetterParams<WarehouseItem>) => new Date(params.row.entryDate),
      valueFormatter: (params: GridValueFormatterParams<Date>) => params.value.toLocaleString(), // Format date and time
    },
    { field: "operation", headerName: "Operacja", flex: 1 },
    ...(currentUser?.isAdmin === "true"
      ? [
          {
            field: "action",
            headerName: "Delete",
            width: 100,
            renderCell: (params: { row: WarehouseItem }) => (
              <button className="mx-3" onClick={() => confirmDelete(params.row.id)}>
                <AiFillDelete size={25} />
              </button>
            ),
          },
        ]
      : []),
  ];

  const rows = WarehouseItems.map((item: WarehouseItem) => ({
    id: item.id,
    userName: item.user?.name || "",
    manufacturer: item.manufacturer,
    model: item.model,
    name: item.name,
    quantity: item.quantity,
    productValue: item.productValue,
    totalValue: item.quantity * item.productValue,
    notes: item.notes,
    entryDate: new Date(item.entryDate).toISOString(),
    operation: item.quantity > 0 ? "Dodano" : "Zabrano",
  }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { productId, quantity, notes, operation } = formData;

    if (!productId || quantity <= 0) {
      Swal.fire({
        title: "Warning!",
        icon: "warning",
        text: "All fields are required and quantity must be greater than zero!",
      });
      return;
    }

    try {
      const selectedProduct = Products.find((product: Product) => product.id === productId);
      if (!selectedProduct) {
        throw new Error("Product not found");
      }

      let updatedQuantity = selectedProduct.quantity;
      if (operation === "Dodaję") {
        updatedQuantity += quantity;
      } else if (operation === "Zabieram") {
        updatedQuantity -= quantity;
        if (updatedQuantity < 0) {
          throw new Error("Insufficient quantity");
        }
      }

      const warehouseData = {
        userId: currentUser.id,
        productId,
        manufacturer: selectedProduct.manufacturer,
        model: selectedProduct.model,
        name: selectedProduct.name,
        quantity: operation === "Dodaję" ? quantity : -quantity,
        productValue: selectedProduct.price,
        notes: notes || null,
        operation,
      };

      console.log("Sending warehouse data:", warehouseData);

      await axios.post("/api/warehouse", warehouseData);

      console.log(`Updating product ${productId} with new quantity: ${updatedQuantity}`);

      mutateWarehouse();
      mutateProducts();
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: "Item added successfully!",
      });
      setFormData({
        productId: "",
        quantity: 0,
        notes: "",
        operation: "Dodaję",
      });
    } catch (error) {
      console.error("Error adding item:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Failed to add item. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="mb-10 px-8 lg:px-16 py-8 self-center mx-auto w-full">
        <div className="flex w-full">
          <div className="w-full">
            <h2 className="text-4xl mb-8 text-center font-semibold">Dodaję</h2>
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]">
              <SelectInput
                id="productId"
                name="productId"
                label="Produkt"
                onChange={handleInputChange}
                value={formData.productId}
                options={Products.map((product: Product) => ({
                  value: product.id,
                  label: `${product.name} (${product.manufacturer} - ${product.model})`,
                }))}
              />
              <SelectInput
                id="operation"
                name="operation"
                label="Operacja"
                onChange={handleInputChange}
                value={formData.operation}
                options={[
                  { value: "Dodaję", label: "Dodaję" },
                  { value: "Zabieram", label: "Zabieram" },
                ]}
              />
              <Input
                label="Ilość"
                name="quantity"
                onChange={handleInputChange}
                id="quantity"
                type="number"
                value={formData.quantity}
                min={0}
              />
              <Input
                label="Uwagi"
                name="notes"
                onChange={handleInputChange}
                id="notes"
                type="text"
                value={formData.notes}
                required={false}
              />
              <button type="submit" className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition">
                Dodaj
              </button>
            </form>
          </div>
        </div>
        <DetailsList columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Warehouse;
