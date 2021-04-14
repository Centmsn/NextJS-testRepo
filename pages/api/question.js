import { connectToDB } from "../../utils/connectToDb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { question, correct, answers } = req.body;

    const client = await connectToDB();
    const questionCollection = client.db().collection("questions");
    const newQuestion = {
      correct,
      question,
      answers,
    };

    try {
      await questionCollection.insertOne(newQuestion);
    } catch (err) {
      console.log(err);
    }

    res.send({ message: "OK" });
  }
};

export default handler;
