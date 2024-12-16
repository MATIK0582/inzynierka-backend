import { getAllGroupNames } from "../../utils/queries/groups/groupQueries";

export const validateRepeatedName = async (groupName: string): Promise<boolean> => {
    const normalizedInputName = groupName.toLowerCase();
    const groups = await getAllGroupNames()
    
    return groups.some((group) => group.name.toLowerCase() === normalizedInputName);
};
