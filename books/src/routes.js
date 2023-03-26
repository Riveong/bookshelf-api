const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler,editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
  //masukan data
    {
      method: 'POST',
      path: '/books',
      handler: addNoteHandler,
    },
  //ambil semua data
    {
      method: 'GET',
      path: '/books',
      handler: getAllNotesHandler,
    },
  //ambil data berdasarkan id
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getNoteByIdHandler,
    },
  //edit data berdasarkan id
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editNoteByIdHandler,
    },
  //delete data berdasarkan id
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteNoteByIdHandler,
      },
    
  ];
   
  module.exports = routes;