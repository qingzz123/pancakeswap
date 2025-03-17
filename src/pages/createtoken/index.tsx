import { CHAIN_IDS } from 'utils/wagmi'
import CreateToken from 'views/CreateToken'

const CreateTokenPage = () => <CreateToken />

CreateTokenPage.chains = CHAIN_IDS

export default CreateTokenPage
