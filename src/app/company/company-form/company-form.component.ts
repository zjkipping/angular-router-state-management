import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { CompanyService, Company } from '@services/company/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  selectedCompany: Company | null;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.selectedCompany = await this.companyService.selectedCompany
      .pipe(take(1))
      .toPromise();

    this.companyForm = this.fb.group({
      name: this.fb.control(
        this.selectedCompany.name || '',
        Validators.required
      )
    });
  }

  submitForm() {
    console.log('Do something with this company data', {
      ...this.selectedCompany,
      ...this.companyForm.value
    });
  }
}
