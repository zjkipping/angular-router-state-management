import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { CompanyService } from '@services/company/company.service';
import { Company } from '@types';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  selectedCompany: Company | null;
  companyForm: FormGroup;

  constructor(private companyService: CompanyService, fb: FormBuilder) {
    this.companyForm = fb.group({
      name: fb.control('', Validators.required)
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
          ...this.companyForm.value
        });
      } else {
        await this.companyService.createCompany(this.companyForm.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
