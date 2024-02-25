import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.scss']
})
export class PostProductFaqComponent {

  idProduct: number = this.activatedRoute.snapshot.params["idProduct"];
  FAQForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    })
  }

  postFAQ() {
    this.adminService.postFAQ(this.idProduct, this.FAQForm.value).subscribe(res => {
      if(res.id != null) {
        this.snackBar.open('FAQ Agregado Exitosamente', 'ok', {duration: 5000});
        this.router.navigateByUrl('/admin/dashboard')
      }else {
        this.snackBar.open('Error al guardar', 'ERROR', {duration: 5000});
      }
    })
  }
}
