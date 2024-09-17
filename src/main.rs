use actix_web::{App, HttpServer};

// lib hecate
use hecate_lib::application::ping::ping_route;
use hecate_lib::domaine::ping::ping_schema::Ping;

use tracing::info;
use tracing_subscriber;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

#[derive(OpenApi)]
#[openapi(paths(ping_route::test), components(schemas(Ping)))]
struct ApiDoc;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    tracing_subscriber::fmt::init();

    let openapi = ApiDoc::openapi();

    // log pour le schema json de openapi doc
    //let openapi_json = serde_json::to_string_pretty(&openapi).expect("Failed to serialize OpenAPI");
    //tracing::info!("OpenAPI generated: {}", openapi_json);

    info!("Starting server");
    HttpServer::new(move || {
        App::new()
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}").url("/api-doc/openapi.json", openapi.clone()),
            )
            .service(ping_route::test)
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
