interface BetJson{
		name :string;
		kind :string;		
		total:number;
		lucky:string;
		shash :string;
		nonce:string;
		ckey:string;
        pick : {icon:string;stake:number;profit:number}[];
		pk :   {icon:string;stake:number;profit:number}[];   		
}
interface LabelledValue {
  label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}
function printBetJson(obj: BetJson) {
  console.log(obj);
}

/*
		kind :string;
		total :int;
		pick :{icon:int;stack:int;}[];

         var betInfo =   
         {   
            "user":"andy",   
            "kind":"slot",   
            "total":3120,   
            "pick":{"icon0":0,"icon1":20,"icon3":100},
            "pk":{"human":0,"mob":3000} 
         }  
*/