import Image from "./image";
import styles from "../assets/scss/photo.module.scss"

const MediaPhoto = ({ photoBlock }) => { 
    return (
        <div className={styles.photoBlock} >
        <Image image={photoBlock.photo} />
            <div className={styles.caption}>
            {photoBlock.description}
        </div>
    </div>
    )
}

export default MediaPhoto