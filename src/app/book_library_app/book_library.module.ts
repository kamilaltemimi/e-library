import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthComponent } from './auth/auth.component'
import { BookLibraryRouterModule } from './book_library_router.module'

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        BookLibraryRouterModule
    ],
    exports: []
})

export class BookLibraryModule {}