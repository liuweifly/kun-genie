import { db } from '@vercel/postgres';
import { customerInfo, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS usersAccount (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return client.sql`
        INSERT INTO usersAccount (id, name)
        VALUES (${user.userId}, ${user.userName})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCustomerInfo() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customerInfo (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      birthDateTime VARCHAR(255) NOT NULL,
      gender VARCHAR(255) NOT NULL,
      userId UUID NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customerInfo.map(
      (customer) => client.sql`
        INSERT INTO customerInfo (id, name, birthDateTime, gender, userId)
        VALUES (${customer.id}, ${customer.name}, ${customer.birthDateTime}, ${customer.gender}, ${customer.userId})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCustomerInfo();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
