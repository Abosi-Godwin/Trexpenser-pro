const URL = "https://picsum.photos/v2/list?page=6&limit=6";

export const loader = async () => {
    const res = await fetch(URL);
    const imgs = await res.json();
    return imgs.map(img => img.download_url).slice(0, 6);
};
