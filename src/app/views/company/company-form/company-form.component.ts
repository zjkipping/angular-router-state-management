import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { Company } from '@types';
import { CompanyService } from '@services/company/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  selectedCompany: Company | null;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.companyForm = fb.group({
      name: fb.control('', Validators.required),
    });
  }

  async ngOnInit() {
    this.selectedCompany = await this.companyService.selectedCompany
      .pipe(take(1))
      .toPromise();

    if (this.selectedCompany) {
      this.companyForm.patchValue(this.selectedCompany);
    }
  }

  async submitForm() {
    try {
      if (this.selectedCompany) {
        await this.companyService.updateCompany({
          ...this.selectedCompany,
          ...this.companyForm.value,
        });
      } else {
        await this.companyService.createCompany(this.companyForm.value);
      }
      await this.router.navigate(['../'], {
        relativeTo: this.activatedRoute,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
