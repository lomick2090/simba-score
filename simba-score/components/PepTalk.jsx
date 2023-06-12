import AudioPlayer from "./AudioPlayer";


export default function PepTalk({pepTalk}) {
    const {url} = pepTalk;
    return (
        <div>
            <AudioPlayer url={url} />
        </div>
    )
}