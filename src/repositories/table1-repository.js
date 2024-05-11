const create = async (connection) => {
    const query = "INSERT INTO table1 (table1) VALUES (?)";
    const values = ["table1"];
    const result = await connection.execute(query, values);
    return result
}

export default {
    create
}