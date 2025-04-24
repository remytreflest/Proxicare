import { Router } from 'express';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

const pool = require("../src/db");
const router = Router();

router.get('/qrcode', async (req, res) => {
    try {
        // Générer deux GUID aléatoires
        const data = {
            id1: uuidv4(),
            id2: uuidv4()
        };

        // Convertir l'objet en QR code
        // const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));

        // res.send(`<img src="${qrCodeDataUrl}" />`);

        // Construire l'URL de redirection (remplace localhost par ton domaine en prod)
        const url = `http://localhost:5000/api/qrcode/${data.id1}`;

        // Générer le QR Code contenant cette URL
        const qrCodeDataUrl = await QRCode.toDataURL(url);

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Scan the QR Code</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                    img { width: 300px; height: 300px; margin-top: 20px; }
                    p { font-size: 18px; color: #333; }
                </style>
            </head>
            <body>
                <h1>Scan the QR Code</h1>
                <p>Once scanned, you will be redirected automatically.</p>
                <img src="${qrCodeDataUrl}" alt="QR Code" />
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Erreur lors de la génération du QR Code:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;
