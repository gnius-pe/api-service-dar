import checkNumber from "../controllers/checkNumber.js";

test('Verificar numero positivo',() => {
    expect(checkNumber(3)).toBe(true);
    expect(checkNumber(-4)).toBe(false);
    expect(checkNumber(0)).toBe(false);
});
