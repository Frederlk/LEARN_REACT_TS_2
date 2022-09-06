type Props = {
    error: string;
};

const Error = ({ error }: Props) => {
    return <p className="text-center">{error}</p>;
};

export default Error;
