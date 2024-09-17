use crate::domaine::ping::ping_schema::Ping;
use actix_web::{get, HttpResponse, Responder};

#[utoipa::path(get, path = "/ping", responses(
    (
        status = 200, 
        description = "retourne un object simple pour tester que l'api est fonctionnelle", 
        body = Ping
    )
))]
#[get("/ping")]
pub async fn test() -> impl Responder {
    let response = Ping::new();
    HttpResponse::Ok().json(response)
}
