export default function calcularPromedio(listaNota){
    let promedio = 0;
    if(listaNota.length !== 0){
        if(listaNota.some(nota => nota <=0)){
            return 0;
        }
    }
    if(listaNota.length === 0 ){
        return ;
    }
    for(let i = 0 ; i < listaNota.length; i++){
        promedio += listaNota[i];
    }
    return promedio/listaNota.length;
}