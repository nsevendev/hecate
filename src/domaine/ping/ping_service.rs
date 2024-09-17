use crate::domaine::ping::ping_schema::Ping;

impl Ping {
    pub fn new() -> Self {
        Self {
            status: 200,
            value: String::from("L'api fonctionne correctement"),
        }
    }
}
