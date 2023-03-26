const { nanoid } = require('nanoid');
const books = require('./books');



const addNoteHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
   
//catching untuk no name
    if (name == undefined) {
      const response = h.response({

          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',

        })
        response.code(400);
      return response;
   
   


    }

//catching untuk salah hitung page
    if (pageCount < readPage){
      const response = h.response({

        status: 'fail',
        message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"

      })
      response.code(400);
      return response;
    }

    const id = nanoid(16);
    //kriteria finished
    if(pageCount==readPage){isFinished = true;};
    if(pageCount!=readPage){isFinished=false;};
    const finished = isFinished;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;


    const newNote = {
      name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt, 
    };

    books.push(newNote);
   
    //catching success
    const isSuccess = books.filter((note) => note.id === id).length > 0;
   
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }


    //else
    const response = h.response({
      status: 'fail',
      message: 'Id error, Buku tidak berhasil ditambahkan',
    });
    response.code(500);
    return response;
  };



  const getAllNotesHandler = (request,h) => {
    const response = h.response({ //catching success
      status : 'success',
      message : 'berhasil request data buku',
      data: {
        books: books.map((note)=>({
          id: note.id,
          name: note.name,
          publisher: note.publisher


        })),
      },
    })
    response.code(200);
    return response;
  };

  const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const book = books.filter((n) => n.id === id)[0];
   
   if (book !== undefined) {
    const response = h.response({
        //catching success
        status: 'success',
        message: 'berhasil ambil data by Id',
        data: {
          book,
        },
      });
      response.code(200);
      return response
   }
    //catching jika buku tidak ditemukan
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    
    //catching untuk no name
    if (name == undefined) {
      const response = h.response({

          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',

        })
        response.code(400);
      return response;
   
   


    }

//catching untuk salah hitung page
    if (pageCount < readPage){
      const response = h.response({

        status: 'fail',
        message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"

      })
      response.code(400);
      return response;
    }
    
    
    
    const updatedAt = new Date().toISOString();
   
    const index = books.findIndex((note) => note.id === id);
   
    if (index !== -1) {
      books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading,updatedAt
      };
   




//catching success
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
   //catching untuk jika id tidak ditemukan

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };
   
  const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = books.findIndex((note) => note.id === id);
   //catching success
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   //catching jika id tidak ditemukan
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };


module.exports = { addNoteHandler,getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };