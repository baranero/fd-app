import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt, { compare } from 'bcrypt'

import serverAuth from '@/lib/serverAuth'
import Credentials from 'next-auth/providers/credentials'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { currentUser } = await serverAuth(req, res)
    
            return res.status(200).json(currentUser)
    } catch (error) {
        console.log(error);
        return res.status(500).end()
    }

    } else if (req.method === 'PUT') {
        try {
            const { currentUser } = await serverAuth(req, res)
            const { password, newPassword } = req.body
            console.log(currentUser.hashedPassword);



            
            const passwordChange = prismadb.user.update({
                where: {
                    name: currentUser.name
                },
                data: {

                }
            })
            
            
    
            return res.status(200).json(currentUser)
    } catch (error) {
        console.log(error);
        return res.status(500).end()
    }
    }
}