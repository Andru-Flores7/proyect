
export interface IBook {
  id: string;        
  title: string;      
  author: string;    
  available: boolean;
}

export class Book implements IBook {
  
     id: string;
     title: string;
     author: string;
     available: boolean ;

     constructor ( id:string , title:string, author:string){
     this.id = id;
    this.title = title;
    this.author = author;
    this.available = true; 

// Un libro debe tener título
    if (!title.trim()) {
      throw new Error('Un libro debe tener título');
    }
 // Un libro debe tener autor
    if (!author.trim()) {
      throw new Error('Un libro debe tener autor');
    }


  }
    
      //un libro puede ser prestado
  borrow(): void {
    if (!this.available) {
    throw new Error ("No se puede prestar un libro que no esta disponible") ;
  }
   this.available = false ;

  }
      //un libro puede ser devuelto
  return(): void {
    if (this.available) {
      throw new Error ("No se puede devolver un libro que no esta prestado") ;
    }
    this.available = true ;
  }
}
  

     
  
   




