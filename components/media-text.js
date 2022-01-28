const MediaText = ({ component }) => {
    return (
        <section className="media-text">
            <div className="uk-card-media-top">
                {component.Text}
            </div>
        </section>
    )
}

export default MediaText