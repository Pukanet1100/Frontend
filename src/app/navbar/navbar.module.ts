import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [NavbarComponent],
    imports: [
            CommonModule, 
            RouterModule,
            FormsModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule {}