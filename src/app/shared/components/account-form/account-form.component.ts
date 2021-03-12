import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountsService } from 'src/app/services/accounts.service';
import { BitacorasService } from 'src/app/services/bitacoras.service';
import { Bitacora } from '../../models/bitacora.interface';

import { Account } from '../../models/account.interface';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {

  account: Account;
  accountForm: FormGroup;
  bitacora: Bitacora;
  
  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountsService: AccountsService,

  ) {
    const navigation = this.router.getCurrentNavigation();
    this.account = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.account === 'undefined') {
      // this.router.navigate(['new']);  -------------------> Trabajando bitacora
    } else {
      this.accountForm.patchValue(this.account);
    }
  }

  onSave(): void {
    console.log('Saved', this.accountForm.value);
    if (this.accountForm.valid) {
      const account = this.accountForm.value;
      const accountId = this.account?.id || null;
      this.accountsService.onSaveAccounts(account, accountId);
      this.accountForm.reset();
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  isValidField(field: string): string {
    const validatedField = this.accountForm.get(field);
    return !validatedField.valid && validatedField.touched
      ? 'is-invalid'
      : validatedField.touched
      ? 'is-valid'
      : '';
  }

  private initForm(): void {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      movil: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }
}
