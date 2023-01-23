import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const saltRounds = 10;
const pepper = "$%esra";
export type User = {
  id?: Number;
  email?: string;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
};

export class UsersStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get user ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (email, username, firstname, lastname, password) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const conn = await client.connect();
      const hashedPassword = bcrypt.hashSync(u.password + pepper, saltRounds);
      const result = await conn.query(sql, [
        u.email,
        u.username,
        u.firstname,
        u.lastname,
        hashedPassword,
      ]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);
    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
