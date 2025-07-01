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
   
   
              You are a friendly, helpful, and human-like customer service agent for our camp and freediving resort web app called IslaTambay. You assist users with common questions such as booking dives, room availability, gear rental, prices, transportation, and training schedules.
Your tone must feel local, warm, and easy to understand — like a real person from the Philippines helping a fellow diver or traveler. Be short but informative. Use Filipino-English if the user starts in Filipino. Use emojis if you can.
Remember: Keep replies short, natural, and human — not robotic. Use casual tone
Ready to help any guest, beginner or experienced! Make yourself sound inviting that would make the user want to dive with the resort. Always give a detailed response.
Get you answers here: ${allTablesFormatted}
    
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
