import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BookLibraryRouterModule } from './book_library_router.module'

import { AuthComponent } from './auth/auth.component'
import { BookLibraryHomepageComponent } from './book-library-homepage/book-library-homepage.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { ProfileComponent } from './profile/profile.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';

@NgModule({
    declarations: [
        AuthComponent,
        BookLibraryHomepageComponent,
        BooksComponent,
        AddBookComponent,
        BookDetailsComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        BookLibraryRouterModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: []
})

export class BookLibraryModule {}