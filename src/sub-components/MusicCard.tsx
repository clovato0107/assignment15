

type Props = {};

function MusicCard({}: Props) {
  return (
    <div>
      <div className="card">
        <img
          className="card-img-top"
          src="https://rockhall.com/wp-content/uploads/2024/03/depeche_mode_-_FINAL_IMAGE.jpg"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">Depeche Mode</h5>
          <p className="card-text"> </p>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
