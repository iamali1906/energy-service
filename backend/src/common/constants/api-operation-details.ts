export const API_OPERATIONS = {
  DEFAULT: {
    CREATE: {
      summary: "Create a new record",
      description: "Endpoint to create a new record in the database",
    },
    UPSERT: {
      summary: "Create or Update a Record",
      description: "Endpoint to create a new record or update an existing one in the database. If the record already exists, it will be updated; if it doesn't exist, a new record will be created.",
    },
    FIND_ALL: {
      summary: "Retrieve all records",
      description: "Endpoint to retrieve all records from the database",
    },
    FIND_ONE: {
      summary: "Retrieve a single record by ID",
      description:
        "Endpoint to retrieve a single record by its unique identifier",
    },
    UPDATE: {
      summary: "Update a record by ID",
      description: "Endpoint to update an existing record in the database",
    },
    REMOVE: {
      summary: "Delete a record by ID",
      description: "Endpoint to delete a record from the database",
    },
    SOFT_REMOVE: {
      summary: "Soft delete a record by ID",
      description: "Endpoint to soft delete a record from the database",
    },
  },
};
