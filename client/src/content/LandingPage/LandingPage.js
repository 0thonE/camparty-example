import React from "react";
import MaskUse from "../../assets/MaskUse.jpg";

const LandingPage = () => {

    return (
        <div className="bx--grid bx--grid-full-widht">
            <div className="bx--row" style={{ marginBottom: "2em" }}>
                <h2>Estamos en pandemia, hay que cuidarnos pero no perdamos nuestro gusto por acampar</h2>
            </div>
            <div className="bx--row">
                <div className="bx--col-lg-5">
                    <img style={{ width: "100%", marginBottom: "1em" }} src={MaskUse} alt="cuidate del covid" />
                    <p style={{ textAlign: "justify", marginBottom: "1em" }}>
                        Sabemos que quieres cuidarte y a tus seres queridos, pero tanto tiempo en encierro puede ser
                        algo bastante pesado para los que estamos acostumbrados a salir de campisto, por eso te dejamos
                        unas recomendaciones y medidas que puedes seguir para no dejar de hacer lo que tanto amas y disfrutas
                        pero sin dejar de lado tu salud
                    </p>
                    <p style={{ textAlign: "justify" }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus quia asperiores eos voluptas ut minima placeat quam nisi nulla dignissimos atque, ex earum aut, accusantium dolores magni, cumque ad? Saepe!
                        Aliquam dolor, consequuntur recusandae voluptas distinctio quis nam et aut totam, ab voluptatem hic dolores tenetur eligendi rem quisquam. Nesciunt debitis soluta cum sit laudantium magni. Perferendis saepe accusantium nemo!
                        Asperiores sapiente sit possimus quam quae dolores quaerat totam unde non sunt, incidunt nihil cumque, magni animi in obcaecati tenetur quisquam repellat quasi enim, dolor assumenda saepe commodi voluptate. Quos.
                        Voluptates rerum repellendus tenetur voluptatem. Obcaecati esse quaerat harum ...
                     </p>

                </div>
                <div className="bx--col-lg-11">

                    <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                        <div className="bx--aspect-ratio--object">
                            <iframe style={{ height: "inherit",width: "inherit"}} src="https://www.youtube.com/embed/lghshwFi8d4"
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                        </div>
                    </div>


                        </div>
                    </div>
                </div>
    )
}
export default LandingPage;
