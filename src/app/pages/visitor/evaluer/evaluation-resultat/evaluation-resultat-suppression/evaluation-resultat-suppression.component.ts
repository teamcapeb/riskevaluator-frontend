import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { DialogData } from '../evaluation-resultat.component';

@Component({
  selector: 'app-evaluation-resultat-suppression',
  templateUrl: './evaluation-resultat-suppression.component.html',
  styleUrls: ['./evaluation-resultat-suppression.component.scss']
})
export class EvaluationResultatSuppressionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EvaluationResultatSuppressionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,
    private router: Router,
    private evaluationService : EvaluationApiService
  ) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close();
    console.log("suppression de l'évaluation " + this.data.evaluationID);
    this.evaluationService.delete(this.data.evaluationID).subscribe();
    this.router.navigate(["entreprise", this.data.entreprise?.noSiret]);
  }
}
