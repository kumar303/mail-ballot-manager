import fetchJSON from './utils/fetchJSON'
import {
  MailElection,
  InsertsData,
  MailBallotBatch,
  User,
  BallotTemplate,
  Voter,
} from './config/types'
import { Election } from '@votingworks/ballot-encoder'

const useFakeAPI = true

// TODO: remove
function sleep(ms: number = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
// TODO: remove
const mailElection: MailElection = {
  id: 'asfd',
  createdAt: 'asfd',
  electionHash: 'asfd',
  name: 'asfd',
  electionTitle: 'asfd',
  electionDate: 'asfd',
  packageHash: 'asfd',
  approvedAt: 'asfd',
  approvedBy: 'asfd',
  voterCount: 1,
}

export const authenticateUser = async (): Promise<User> => {
  if (useFakeAPI) {
    await sleep()
    return { id: 'foo', email: 'beau@voting.works' }
  }
  return await fetchJSON(`/api/auth/me`)
}

export const createElection = async (data: {
  name: string
}): Promise<{ electionId: string }> => {
  if (useFakeAPI) {
    await sleep()
    return {
      electionId: `uuid-${Date.now()}`, // This will be a UUID
    }
  }
  return await fetchJSON(`/api/mailelection/`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const getElections = async (): Promise<{
  mailElections: MailElection[]
}> => {
  if (useFakeAPI) {
    await sleep()
    return { mailElections: [mailElection] }
  }
  return await fetchJSON(`/api/mailelection/`)
}

export const getElection = async (
  electionId: string
): Promise<MailElection> => {
  if (useFakeAPI) {
    return mailElection
  }
  return fetchJSON(`/api/mailelection/${electionId}`)
}

export const approveElection = async (data: { electionId: string }) =>
  await fetchJSON(`/api/mailelection/${data.electionId}/approve`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

export const putElectionDefinition = async ({
  electionId,
  election,
}: {
  electionId: string
  election: Election
}) =>
  await fetchJSON(`/api/mailelection/${electionId}/definition`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(election),
  })

export const getElectionDefinition = async ({
  electionId,
}: {
  electionId: string
}): Promise<Election> =>
  await fetchJSON(`/api/mailelection/${electionId}/definition`)

export const putBallotTemplate = async ({
  ballotStyleId,
  electionId,
  file,
  precinctId,
}: {
  ballotStyleId: string
  electionId: string
  file: Buffer
  precinctId: string
}) =>
  await fetchJSON(
    `/api/mailelection/${electionId}/ballot-style/${ballotStyleId}/precinct/${precinctId}/template`,
    {
      method: 'put',
      body: file,
    }
  )

export const getBallotTemplate = async ({
  ballotStyleId,
  electionId,
  precinctId,
}: {
  ballotStyleId: string
  electionId: string
  precinctId: string
}): Promise<BallotTemplate> =>
  await fetchJSON(
    `/api/mailelection/${electionId}/ballot-style/${ballotStyleId}/precinct/${precinctId}/template`
  )

export const putMailingList = async ({
  electionId,
  voterMailingListFile,
}: {
  electionId: string
  voterMailingListFile: string
}) =>
  await fetchJSON(`/api/mailelection/${electionId}/mailinglist`, {
    method: 'put',
    body: voterMailingListFile,
  })

export const getVoters = async ({
  electionId,
}: {
  electionId: string
}): Promise<{ voters: Voter[] }> =>
  await fetchJSON(`/api/mailelection/${electionId}/voters`)

export const getInserts = async ({
  electionId,
}: {
  electionId: string
}): Promise<InsertsData> =>
  await fetchJSON(`/api/mailelection/${electionId}/inserts`)

export const putInserts = async ({
  electionId,
  insertsData,
}: {
  electionId: string
  insertsData: InsertsData
}) =>
  await fetchJSON(`/api/mailelection/${electionId}/inserts`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(insertsData),
  })

export const sendBatch = async ({
  electionId,
  batchName,
}: {
  electionId: string
  batchName: string
}) =>
  await fetchJSON(`/api/mailelection/${electionId}/batches/send`, {
    method: 'post',
    body: batchName,
  })

export const getBatches = async ({
  electionId,
}: {
  electionId: string
}): Promise<{ batches: MailBallotBatch[] }> =>
  await fetchJSON(`/api/mailelection/${electionId}/batches`)
