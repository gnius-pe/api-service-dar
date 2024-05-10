import suma from "../controllers/suma.js";

test('suma 1 + 2 equal 3',()=>{
    expect(suma(1,2)).toBe(3);
});
