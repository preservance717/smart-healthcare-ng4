/**
 * Created by gaole on 2017/9/14.
 */
export class PatientInfo{
  patientHistory: PatientHistory = new PatientHistory;
  constructor(

  ){}
}

export class PatientHistory{
  public id: string;
  public patientName: string;
  public sex: string;
  public stature:string;
  public weight:string;
  public age: string;
  public pid:string ;
  public tel:string ;
  public job:string ;
  public smoke:string ;
  public complication:string;
  public jobHistory: string;
  public medicalHistory: string;
  public dustAge: string;
  public dustProperty: string;
}
