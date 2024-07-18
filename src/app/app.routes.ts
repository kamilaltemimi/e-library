import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        loadChildren: () => import('./book_library_app/book_library.module').then(m => m.BookLibraryModule)
    }
];
