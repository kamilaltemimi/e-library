import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from './auth/auth.component'
import { BookLibraryHomepageComponent } from './book-library-homepage/book-library-homepage.component'
import { ProfileComponent } from './profile/profile.component'
import { BooksComponent } from './books/books.component'
import { AddBookComponent } from './books/add-book/add-book.component'

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'homepage', component: BookLibraryHomepageComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'books', component: BooksComponent },
    { path: 'books/add-book', component: AddBookComponent },
    { path: '**', redirectTo: 'auth' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BookLibraryRouterModule {}