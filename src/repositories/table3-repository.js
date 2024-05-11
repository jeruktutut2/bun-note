const create = async (connection) => {
    const query = "INSERT INTO table3 (table3) VALUES (?)";
    const values = ["table2"];
    const result  = await connection.execute(query, values);
    return result
}

export default {
    create
}