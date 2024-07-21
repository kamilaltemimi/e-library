import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthComponent } from './auth/auth.component'

import { SharedModule } from '../shared/shared.module';
import { BookLibraryRouterModule } from './book_library_router.module'
import { BookLibraryHomepageComponent } from './book-library-homepage/book-library-homepage.component';

@NgModule({
    declarations: [
        AuthComponent,
        BookLibraryHomepageComponent
    ],
    imports: [
        CommonModule,
        BookLibraryRouterModule,
        SharedModule
    ],
    exports: []
})

export class BookLibraryModule {}