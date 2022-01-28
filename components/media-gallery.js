import MediaPhoto from "./media-photo"

const MediaGallery = ({ component }) => {
    return (
    <section className="media-gallery">
        <div className="uk-grid">
            <div className={`uk-child-width-1-${component.columns}@m uk-grid-match`} data-uk-grid>
                    {component.photo.map((photoBlock, i) => <MediaPhoto photoBlock={photoBlock} key={i}/>)}
            </div>
        </div>
    </section>
    )
}

export default MediaGallery