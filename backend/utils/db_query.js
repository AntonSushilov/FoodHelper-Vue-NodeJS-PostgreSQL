export const addTuple = (table, dateItem) => {
  const query = `INSERT INTO "${table}" (${Object.keys(dateItem).join(", ")}) VALUES ('${Object.values(dateItem).join("', '")}') RETURNING *`
  return query
}

export const getAllTuple = (table, {orderByAsc = false, orderByDesc = false} = {}) => {
  const query = `SELECT * from "${table}" ${orderByAsc ? "ORDER BY id ASC" : orderByDesc ? "ORDER BY id DESC" : ""} `
  return query
}

export const getOneTuple = (table, where) => {
  const query = `SELECT * from "${table}" ${where ? "WHERE " + Object.keys(where).map((key) => {
    const type = typeof(where[key])
    let value = ""
    switch(type){
      case "string":
        value = `'${where[key]}'`
        break
      case "number":
        value = `${where[key]}`
        break
      case "bigint":
        value = `${where[key]}`
        break
      // case "boolean":
      // case "symbol":
      // case "undefined":
      // case "object":
      // case "function":
    }
    
    return `${key} = ${value}` 
  }).join(", ") : ""}`
  return query
}

export const updateTuple = (table, dateItem) => {
  const query = `UPDATE "${table}" set ${Object.keys(dateItem).filter(el => el!="id").map(el => {
    if (el != "id"){
      return `${el} = '${dateItem[el]}'`
    }
  }).join(", ")} WHERE id = '${dateItem["id"]}' RETURNING *`
  return query
}

export const deleteTuple = (table, id) => {
  const query = `DELETE from "${table}" WHERE id = ${id}`
  return query
}