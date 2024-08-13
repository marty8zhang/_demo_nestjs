/*
 * The `MTIzNDU2` password value was hashed by using
 * `Buffer.from('123456').toString('base64')`.
 */
INSERT INTO "user" (id, email, password, "firstName", "lastName")
VALUES (1, 'john.doe@example.com', 'MTIzNDU2', 'John', 'Doe'),
       (2, 'jane.roe@example.com', 'MTIzNDU2', 'Jane', 'Roe');
