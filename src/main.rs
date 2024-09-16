use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct MyResponse {
    status: u32,
    value: String,
}

#[get("/")]
async fn hello_world() -> impl Responder {
    let response = MyResponse {
        status: 200,
        value: String::from("hello world"),
    };

    HttpResponse::Ok().json(response)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello_world)
    })
    .bind(("0.0.0.0", 6000))?
    .run()
    .await
}