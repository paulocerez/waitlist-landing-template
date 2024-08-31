export default function Loom() {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-gray-500 text-xs">Check out the explanation:</p>
      <iframe
        src="https://www.loom.com/embed/9cb21f641319445eb8e64bde2aa23e34?sid=5dfc7397-4e70-44e9-a45c-d8f319696f67?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
        frameBorder="0"
        allowFullScreen
        className="rounded-md border"
        id="loom"
        width={576}
        height={324}
      ></iframe>
    </div>
  );
}
