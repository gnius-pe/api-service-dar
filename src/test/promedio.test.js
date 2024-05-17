import calcularPromedio from "../controllers/promedio.js";

test('Calcular Promedio',()=>{
    expect(calcularPromedio([])).toBe(undefined);
    expect(calcularPromedio([12,12,12,12])).toBe(12);
    expect(calcularPromedio([12,11])).toBe(11.5);
    expect(calcularPromedio([11])).toBe(11);
    expect(calcularPromedio([-11,12,12])).toBe(0);
});