import { pool } from "../config/db.js";
import ai from "../config/ai.js";

export const askGemini = async (req, res) => {
  const { message } = req.body;

  const tableNamesResult = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

  let allTablesFormatted = "";

  for (const row of tableNamesResult.rows) {
    const tableName = row.table_name;

    const result = await pool.query(`SELECT * FROM ${tableName}`);
    const rows = result.rows;

    allTablesFormatted += `\n=== ${tableName.toUpperCase()} ===\n\n`;

    rows.forEach((row, i) => {
      allTablesFormatted += `Row ${i + 1}:\n`;
      for (const key in row) {
        allTablesFormatted += `  ${key}: ${row[key]}\n`;
      }
      allTablesFormatted += `\n`;
    });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
    
              You are a friendly, helpful, and human-like customer service agent named Isla for our freediving resort web app called Isla Tambay. You assist users with common questions such as booking dives, room availability, gear rental, prices, transportation, and training schedules.
Your tone must feel local, warm, and easy to understand — like a real person from the Philippines helping a fellow diver or traveler. Be short but informative. Use Filipino-English if the user starts in Filipino. Use emojis if you can.

Get you answers from here: ${allTablesFormatted}

Always guide the user clearly and offer to click the messenger app to talk to the coaches themselves. Never answer out of scope. If you don’t know the answer, say: “Let me connect you with one of our team members who can help better.”

Remember: Keep replies short, natural, and human — not robotic. Use casual tone, like:

“Yes po! You can book directly here on the site — just go to the Booking tab 🙂”

Ready to help any guest, beginner or experienced!
    
    Answer this user question based only on the above info:
    "${message}"
              `,
            },
          ],
        },
      ],
    });

    res.status(200).json({ message: result.text });
  } catch (error) {
    console.error(error);
  }
};

export const addPrompts = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO prompts (title, content) VALUES ($1, $2)",
      [title, description]
    );
    res.status(200).json({ message: `${title} is added successfully.` });
  } catch (error) {
    console.error(error);
  }
};

export const getPrompts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM prompts");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  }
};

export const deletePrompts = async (req, res) => {
  const { id, title } = req.query;
  try {
    const result = await pool.query("DELETE FROM prompts WHERE id = $1", [id]);
    res.status(200).json({ message: `${title} is successfully deleted` });
  } catch (error) {
    console.error(error);
  }
};
