use one_dim_ca::{
    cell::Cell, rule::Rule, world::{InitialState, World}
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct WorldManager {
    world: World,
    pub width: usize,
    pub height: usize,
}

#[wasm_bindgen]
impl WorldManager {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize , rule: u8) -> Self {
        Self {
            world: World::new(InitialState::Random, width, Rule::new(rule), true),
            width,
            height,
        }
    }

    // Vec<bool>にするとエラーになる??
    #[wasm_bindgen]
    pub fn make(&mut self) -> Vec<u8> {
        let mut result: Vec<Cell> = Vec::with_capacity(self.height * self.width);
        for _ in 0..self.height {
            result.extend(self.world.forward());
        }

        result.iter().map(|cell| cell.is_alive)
        .map(|alive| if alive { 1 } else { 0 })
        .collect::<Vec<_>>()
    }
}
