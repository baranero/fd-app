import React, { FormEvent, useState } from "react";
import Layout from "@/components/Layout";
import DetailsList from "@/components/DetailsList";
import useUserList from "@/hooks/useUserList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProducts from "@/hooks/useProducts";
import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import axios from "axios";
import swal from "sweetalert";
import { AiFillDelete } from "react-icons/ai";
import Input from "@/components/Input"; // Importuj komponent Input
import Swal from "sweetalert2";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  price: number;
  quantity: number;
  totalValue: number;
  index: number; // Dodajemy numer porządkowy
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

const Products: React.FC = () => {
  const { data: Firefighters = [] } = useUserList();
  const { data: Products = [], mutate } = useProducts();
  const { data: currentUser } = useCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    model: "",
    price: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/products", {
        name: formData.name,
        manufacturer: formData.manufacturer,
        model: formData.model,
        price: formData.price,
      });

      if (response.status === 200) {
        swal({
          title: "Updated!",
          icon: "success",
          text: "Product price updated successfully!",
        });
      } else if (response.status === 201) {
        swal({
          title: "Success!",
          icon: "success",
          text: "Product added successfully!",
        });
      }

      mutate();
      setFormData({
        name: "",
        manufacturer: "",
        model: "",
        price: 0,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        swal({
          title: "Exists!",
          icon: "info",
          text: "Product already exists with the same price.",
        });
      } else {
        console.error("Error:", error);
        swal({
          title: "Error!",
          icon: "error",
          text: "Failed to add product. Please try again.",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      mutate();
      swal({
        title: "Success!",
        icon: "success",
        text: "Product deleted successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      swal({
        title: "Error!",
        icon: "error",
        text: "Failed to delete product. Please try again.",
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
    { field: 'index', headerName: 'Lp.', width: 150 },
    { field: 'manufacturer', headerName: 'Producent', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'name', headerName: 'Nazwa', width: 200 },
    { 
      field: 'price', 
      headerName: 'Cena jedn.', 
      width: 150, 
      type: 'number',
      valueFormatter: (params: GridValueFormatterParams<number | undefined>) => 
        params.value !== undefined ? `${params.value} zł` : '',
    },
    { field: 'quantity', headerName: 'Ilość', width: 150, type: 'number' },
    { 
      field: 'totalValue', 
      headerName: 'Wartość', 
      width: 200, 
      type: 'number',
      valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value} zł`,
    },
    ...(currentUser?.isAdmin === "true"
      ? [
          {
            field: "action",
            headerName: "Delete",
            width: 100,
            renderCell: (params: { row: Product }) => (
              params.row.id !== 'Suma' && (
                <button className="mx-3" onClick={() => confirmDelete(params.row.id)}>
                  <AiFillDelete size={25} />
                </button>
              )
            ),
          },
        ]
      : []),
  ];

  // Oblicz sumę wartości w kolumnie "Wartość"
  const totalSum = Products.reduce((acc: number, product: Product) => acc + product.totalValue, 0);

  const rows = Products.map((product: Product) => ({
    id: product.id,
    index: product.index, // Używamy numeru porządkowego
    manufacturer: product.manufacturer,
    model: product.model,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    totalValue: product.totalValue,
  }));

  // Dodaj wiersz sumy na końcu tabeli
  rows.push({
    id: 'Suma',
    index: rows.length + 1, // Dodajemy numer porządkowy dla wiersza sumy
    manufacturer: '',
    model: '',
    name: '',
    price: undefined,
    quantity: undefined,
    totalValue: totalSum,
  });

  return (
    <Layout>
      <div className=" mb-10 px-8 lg:px-16 py-8 self-center mx-auto w-full">
        {currentUser?.isAdmin === "true" && (
          <div className="flex flex-col w-full mb-8">
            <h2 className="text-4xl mb-8 text-center font-semibold">Dodaj Produkt</h2>
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]">
              <Input
                id="name"
                label="Nazwa"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
              <Input
                id="manufacturer"
                label="Producent"
                name="manufacturer"
                onChange={handleInputChange}
                value={formData.manufacturer}
                required
              />
              <Input
                id="model"
                label="Model"
                name="model"
                onChange={handleInputChange}
                value={formData.model}
                required
              />
              <Input
                id="price"
                label="Cena jedn."
                name="price"
                type="number"
                onChange={handleInputChange}
                value={formData.price}
                min={0}
                required
              />
              <button type="submit" className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition">
                Dodaj
              </button>
            </form>
          </div>
        )}
        <DetailsList columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Products;
