import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from './auth/auth.component'
import { BookLibraryHomepageComponent } from './book-library-homepage/book-library-homepage.component'

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'homepage', component: BookLibraryHomepageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BookLibraryRouterModule {}